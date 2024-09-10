import { db } from "@/config";
import { VisitorDTO } from "@/types/common.dto";
import { addDoc, collection } from "firebase/firestore";



export const StoreVisitorInfo = async (visitorInfo: VisitorDTO) => {
  try {
    const visitorsCollection = collection(db, "visitors");
    const docRef = await addDoc(visitorsCollection, visitorInfo);
    console.log("Visitor stored with ID: ", docRef.id);
  } catch (error) {
    console.error("Error storing visitor info: ", error);
  }
};