import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { storage } from "../firebase"

const getDownloadLink = async (uri, path) => {
  const blob = await new Promise((res, rej) => {
    const xhr = new XMLHttpRequest()
    xhr.onload = () => {
      res(xhr.response)
    }
    xhr.onerror = () => {
      rej(new TypeError("Request Failed"))
    }
    xhr.responseType = "blob"
    xhr.open("GET", uri, true)
    xhr.send(null)
  })

  const storageRef = ref(storage, `${path}/${blob._data.name}`)

  await uploadBytes(storageRef, blob)

  const downloadURL = await getDownloadURL(storageRef)

  console.log(downloadURL)
  return downloadURL
}

export default getDownloadLink
