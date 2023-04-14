import api from "../../Services/Api/api.js"

export function handlePosts(timelineView, userInfo, setLoading, setPosts) {
    if (userInfo && timelineView === 1) {

      setLoading(true);
      api
        .get(`/publications/user-communities`, {
          headers: { Authorization: "Bearer " + userInfo.token },
        })
        .then((res) => {
          setLoading(false);
          setPosts(res.data);
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    }
    if (userInfo && timelineView === 0) {
      setLoading(true);
      api
        .get("/publications/timeline", {
          headers: { Authorization: "Bearer " + userInfo.token },
        })
        .then((res) => {
          setPosts(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 403) {
            localStorage.removeItem("userInfo");
            navigate("/sign-in");
          }
          setLoading(false);
        });
    }
  }