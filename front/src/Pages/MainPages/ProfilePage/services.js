import api from "../../Services/Api/api.js"

export function handleContent(profileView, userInfo, userName, setLoading, setContent) {
    if (userInfo && profileView === 1) {
      setLoading(true);
      api
        .get(`/communities/user/${userName}`)
        .then((res) => {
          setLoading(false);
          setContent(res.data);
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    }
    console.log(profileView);
    if (userInfo && profileView === 0) {
      setLoading(true);
      api
        .get("/publications/profile", {
          headers: { Authorization: "Bearer " + userInfo.token },
        })
        .then((res) => {
          setLoading(false);
          setContent(res.data);
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    }
  }