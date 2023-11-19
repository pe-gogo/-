export default function request(url, method, data) {
  // 获取tokenValue

  console.log(url)
  const baseUrl = "http://localhost:3000"
  console.log(baseUrl +url)

	var tokenName = uni.getStorageSync('tokenName');    // 从本地缓存读取tokenName值
	var tokenValue = uni.getStorageSync('tokenValue');    // 从本地缓存读取tokenValue值
	var header = {
    // "content-type": "application/x-www-form-urlencoded"
  };
	if (tokenName != undefined && tokenName != '') {
		header[tokenName] = tokenValue;
	}


  return new Promise((resolve, reject) => {
    uni.request({
      url:baseUrl + url,
      method,
      data,
      header: header,
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res);
        } else {
          reject(res);
        }
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
}
