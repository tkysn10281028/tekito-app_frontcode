import axios from 'axios' //追記
import router from './router'
function WhoAmI() {
    axios
        .get("/api/v1/whoami", {
          headers: {
            Authorization: sessionStorage.getItem("jwtToken"),
          },
        })
        .then()
        .catch((error) => {
          console.log(error);
          router.push("/login");
        });
}
export default {WhoAmI};