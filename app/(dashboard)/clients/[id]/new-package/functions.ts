export function generateFullUrl(
  url: string,
  username: string,
  password: string,
) {
  return `${url}/get.php?username=${username}&password=${password}&type=m3u_plus&output=mpegs`;
}
