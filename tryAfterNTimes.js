const delayTimer = (caller, delay) => {
  setTimeout(() => {
    caller();
  }, delay);
};

const fetchWithAutoRetry2 = (fetcher, retryCount, delay) => {
  let retries = 0;
  return new Promise((resolve, reject) => {
    const caller = () => {
      fetcher()
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          if (retries < retryCount) {
            retries++;
            delayTimer(caller, delay);
          } else {
            reject(error);
          }
        });
    };
    retries++;
    caller();
  });
};

const fetchCall2 = async () => {
  console.log("fired !");
  const rawResponse = await fetch("https://api.gihub.com/users/AnirupPat");
  const jsonResponse = await rawResponse.json();
  console.log(jsonResponse);
};

fetchWithAutoRetry2(fetchCall2, 5, 3000);
