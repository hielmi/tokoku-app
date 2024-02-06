import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import app from "./init";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const firestore = getFirestore(app);

const storage = getStorage(app);

export async function retriveData(collectionName: string) {
  const querySnapshot = await getDocs(collection(firestore, collectionName));
  const data = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
}

export async function retriveDataById(collectionName: string, id: string) {
  const querySnapshot = await getDoc(doc(firestore, collectionName, id));
  const data = querySnapshot.data();

  return data;
}

export async function retriveDataByField(
  collectionName: string,
  field: string,
  value: string
) {
  const q = query(
    collection(firestore, collectionName),
    where(field, "==", value)
  );

  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
}

export async function addData(
  collectionName: string,
  data: any,
  callback: Function
) {
  await addDoc(collection(firestore, collectionName), data)
    .then((res) => {
      callback(true, res);
    })
    .catch((error) => {
      callback(false);
      console.log(error);
    });
}

export async function updateData(
  collectionName: string,
  id: string,
  data: any,
  callback: Function
) {
  const docRef = doc(firestore, collectionName, id);
  await updateDoc(docRef, data)
    .then(() => {
      callback(true);
    })
    .catch(() => {
      callback(false);
    });
}

export async function deleteData(
  collectionName: string,
  id: string,
  callback: Function
) {
  const docRef = doc(firestore, collectionName, id);
  await deleteDoc(docRef)
    .then(() => {
      callback(true);
    })
    .catch(() => {
      callback(false);
    });
}

export async function uploadFile(
  userId: string,
  file: any,
  callback: Function
) {
  if (file) {
    if (file.size < 1048576) {
      const newName = "profile_" + userId + "." + file.name.split(".")[1];
      const storageRef = ref(storage, `images/users/${userId}/${newName}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL: any) => {
            callback(true, downloadURL);
          });
        }
      );
    } else {
      return callback(false);
    }
  }
  return true;
}
