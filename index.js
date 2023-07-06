import { tweetsData } from "./data.js";
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

const feed = document.getElementById("feed")


document.addEventListener('click', function(e){
    if(e.target.dataset.like) {
        handleLikeClick(e.target.dataset.like)
    }
    else if(e.target.dataset.retweet) {
        handleRetweetClick(e.target.dataset.retweet)
    }
    else if(e.target.dataset.reply){
        handleReplyClick(e.target.dataset.reply)
    }
    else if(e.target.id === 'tweet-btn') {
        handleTweetBtnClick()
    }
    else if(e.target.id === 'reply-btn') {
        handleTweetReplyBtnclick()
    }
})

function handleLikeClick(tweetId) {
    
    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]

    if(targetTweetObj.isLiked) {
        targetTweetObj.likes--
        targetTweetObj.isLiked = false
    } else {
        targetTweetObj.likes++
        targetTweetObj.isLiked = true
    }

    render()
}

function handleRetweetClick(tweetId) {
    
    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]
    
    if(targetTweetObj.isRetweeted) {
        targetTweetObj.retweets--
        targetTweetObj.isRetweeted = false
    } else {
        targetTweetObj.retweets++
        targetTweetObj.isRetweeted = true
    }

    render()
}

function handleReplyClick(replyId){
    document.getElementById(`replies-${replyId}`).classList.toggle('hidden')
}

function handleTweetBtnClick() {

    const tweetInput = document.getElementById("tweet-input")

    if(tweetInput.value) {
        tweetsData.unshift({
            handle: `@Askur`,
            profilePic: `images/scrimbalogo.png`,
            likes: 0,
            retweets: 0,
            tweetText: `${tweetInput.value}`,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            uuid: uuidv4()
    })
    render()
    tweetInput.value = ''
    }
}

function handleTweetReplyBtnclick(commentId) {

  

}



function getFeedHtml() {
    let feedHtml = ``

    tweetsData.forEach(function(tweet){

        let likeIconClass = ''
        let retweetIconClass = ''

        if(tweet.isLiked) {
            likeIconClass = 'liked'
        }

        if(tweet.isRetweeted) {
            retweetIconClass = 'retweeted'
        }

        let repliesHtml = ''

        if(tweet.replies.length > 0) {
            tweet.replies.forEach(function(reply) {
                repliesHtml += `
                <div class="tweet-reply">
                    <div class="tweet-inner">
                        <img src="${reply.profilePic}" class="profile-pic">
                            <div>
                                <p class="handle">${reply.handle}</p>
                                <p class="tweet-text">${reply.tweetText}</p>
                            </div>
                        </div>
                </div>`
            })
        }


        feedHtml += `
            <div class="tweet">
                <div class="tweet-inner">
                    <img src="${tweet.profilePic}" class="profile-pic">
                    <div>
                        <p class="handle">${tweet.handle}</p>
                        <p class="tweet-text">${tweet.tweetText}</p>
                        <div class="tweet-details">
                            <span class="tweet-detail">
                                ${tweet.replies.length}
                                <i class="fa-regular fa-comment-dots" data-reply="${tweet.uuid}"></i>
                            </span>
                            <span class="tweet-detail">
                                ${tweet.likes}
                                <i class="fa-solid fa-heart ${likeIconClass}" data-like="${tweet.uuid}"></i>
                            </span>
                            <span class="tweet-detail">
                                ${tweet.retweets}
                                <i class="fa-solid fa-retweet ${retweetIconClass}" data-retweet="${tweet.uuid}"></i>
                            </span>
                        </div>   
                    </div>            
                </div>
                <div class="hidden" id="replies-${tweet.uuid}">
                    <div class="replytextarea">
                      <textarea class="replytext" placeholder="Comment" id="comment-${tweet.uuid}"></textarea>
                      <button class="replybtn" id="reply-btn">Reply</button>
                    </div>
                    ${repliesHtml}
                </div>
            </div>`
    }) 
return feedHtml
}

function render() {
    feed.innerHTML = getFeedHtml()
}

render()

// need to itarate over the data-comment and matchit with commentId