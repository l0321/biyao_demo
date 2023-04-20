export default function request(url, data = {}, method = 'GET') {
	return new Promise((resolve, reject) => {
		uni.request({
			url: '/api' + url,
			method: method,
			data: data,
			success(res) {
				// 状态码以 2 开头，表示请求成功
				if (/^2\d{2}$/.test(res.statusCode)) {
					resolve(res.data);
				} else {
					reject(res);
				}
			},
			fail(err) {
				reject(err);
			}
		})
	})
}