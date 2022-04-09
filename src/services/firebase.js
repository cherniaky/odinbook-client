// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
    deleteObject,
} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBYrsNCgsX5UH2hz5DmbmBpL0Z2HEr7Lwg",
    authDomain: "odinbook-7a5a4.firebaseapp.com",
    projectId: "odinbook-7a5a4",
    storageBucket: "odinbook-7a5a4.appspot.com",
    messagingSenderId: "858050688957",
    appId: "1:858050688957:web:78001c73739fee81f244d4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export async function uploadImage(file, postId) {
    try {
        // 1 - We add a message with a loading icon that will get updated with the shared image.
        // const photoRef = await addDoc(collection(getFirestore(), "photos"), {
        //     caption: caption,
        //     comments: [],
        //     dateCreated: Date.now(),
        //     imageSrc: "",
        //     likes: [],
        //     //  photoId : `${userId}${Date.now()}`,
        //     userId: userId,
        // });

        // 2 - Upload the image to Cloud Storage.
        const filePath = `/posts/${postId}/${file.name}`;
        const newImageRef = ref(getStorage(), filePath);
        const fileSnapshot = await uploadBytesResumable(newImageRef, file);

        // 3 - Generate a public URL for the file.
        const publicImageUrl = await getDownloadURL(newImageRef);

        // 4 - Update the chat message placeholder with the image's URL.
        // await updateDoc(photoRef, {
        //     imageSrc: publicImageUrl,
        //     storageUri: fileSnapshot.metadata.fullPath,
        // });
        return { imageSrc: publicImageUrl };
    } catch (error) {
        console.error(
            "There was an error uploading a file to Cloud Storage:",
            error
        );
    }
}
export async function uploadProfileImage(file, user) {
    try {
        // 1 - We add a message with a loading icon that will get updated with the shared image.
        // const photoRef = await addDoc(collection(getFirestore(), "photos"), {
        //     caption: caption,
        //     comments: [],
        //     dateCreated: Date.now(),
        //     imageSrc: "",
        //     likes: [],
        //     //  photoId : `${userId}${Date.now()}`,
        //     userId: userId,
        // });
        // console.log(user);
        if (user.profilePicName && file.name != user.profilePicName) {
            const delfilePath = `/users/${user._id}/${user.profilePicName}`;
            const delImageRef = ref(getStorage(), delfilePath);
            await deleteObject(delImageRef);
        }

        // 2 - Upload the image to Cloud Storage.
        const filePath = `/users/${user._id}/${file.name}`;
        const newImageRef = ref(getStorage(), filePath);
        const fileSnapshot = await uploadBytesResumable(newImageRef, file);

        // 3 - Generate a public URL for the file.
        const publicImageUrl = await getDownloadURL(newImageRef);

        // 4 - Update the chat message placeholder with the image's URL.
        // await updateDoc(photoRef, {
        //     imageSrc: publicImageUrl,
        //     storageUri: fileSnapshot.metadata.fullPath,
        // });
        return { imageSrc: publicImageUrl };
    } catch (error) {
        console.error(
            "There was an error uploading a file to Cloud Storage:",
            error
        );
    }
}
