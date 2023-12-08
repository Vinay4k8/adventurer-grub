import { deleteObject, ref } from "firebase/storage";
import { storage } from "./firebase";


const deleteImage =async (fileUrl) => {
    const filePath = decodeURIComponent(new URL(fileUrl).pathname);
    let filePathM=filePath.replace('v0/b/adventurer-grub.appspot.com/o/', '');
    const fileRef = ref(storage, filePathM);
    await deleteObject(fileRef)
}

export default deleteImage