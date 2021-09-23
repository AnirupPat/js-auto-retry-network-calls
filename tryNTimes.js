const fetchWithAutoRetry = (fetcher, retryCounter) => {
  let count = 0;
  return new Promise((resolve, reject) => {
    const caller = () => {
      fetcher()
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          if (count < retryCounter) {
            count++;
            caller();
          } else {
            reject(error);
          }
        });
    };

    count++;
    caller();
  });
};

const fetchCall = async () => {
  console.log("fired !");
  const rawResponse = await fetch("https://api.gihub.com/users/AnirupPat");
  const jsonResponse = await rawResponse.json();
  console.log(jsonResponse);
};

fetchWithAutoRetry(fetchCall, 5);
