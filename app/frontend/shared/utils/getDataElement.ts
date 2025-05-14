export const getDataElement = <T>(id : string) => {
  var text = document.getElementById(id)?.textContent
  if (text) {
    var data = JSON.parse(text)
    return data as T
  }
}
