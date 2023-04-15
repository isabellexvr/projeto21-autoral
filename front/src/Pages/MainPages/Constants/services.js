import api from "../../Services/Api/api.js"

function getTimeAgo(time) {
  const createdAt = new Date(time).getTime();
  const now = new Date().getTime();

  const timeDiff = Math.abs(createdAt - now);

  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    if(days > 0){
        return `${days} days ago`
    }
    if(hours > 0){
        return `${hours} hours ago`
    }
    if(minutes > 0){
        return `${minutes} minutes ago`
    }
    return `${seconds} seconds ago`
}

  const handleLike = (postId, userInfo, setLikeLoading) => {
    setLikeLoading(true);
    api
      .post(
        "/likes/new/" + postId,
        { postId },
        {
          headers: { Authorization: "Bearer " + userInfo.token },
        }
      )
      .then((res) => {
        setLikeLoading(false);
      })
      .catch((err) => {
        setLikeLoading(false);
      });
  };

  const handleDislike = (postId, userInfo, setLikeLoading) => {
    setLikeLoading(true);
    console.log(postId);
    api
      .delete("/likes/dislike/" + postId, {
        headers: { Authorization: "Bearer " + userInfo.token },
      })
      .then((res) => {
        setLikeLoading(false);
        console.log(res.data);
      })
      .catch((err) => {
        setLikeLoading(false);
        console.log(err);
      });
  };

export const services = { getTimeAgo, handleLike, handleDislike };
