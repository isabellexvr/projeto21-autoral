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

export const services = { getTimeAgo };
