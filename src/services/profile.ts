import { profileDTO } from "@/types/common.dto";
import { collection, doc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore";

export async function upsertProfile(profile: profileDTO) {
    const db = getFirestore();
    const profileRef = doc(db, "profiles", profile.uid); // Use uid as the document ID

    try {
        await setDoc(profileRef, profile, { merge: true }); // Merge to update if exists, insert if not
        console.log("Profile successfully saved:", profile.uid);
    } catch (error) {
        console.error("Error saving profile: ", error);
    }
}


// Function to get all profiles or search profiles based on a query
export async function getProfiles(searchQuery = '') {
    const db = getFirestore();
    const profilesRef = collection(db, "profiles"); // Reference to the profiles collection

    try {
        let q;

        if (searchQuery) {
            // Assuming we are searching by displayName
            q = query(profilesRef, where("displayName", ">=", searchQuery), where("displayName", "<=", searchQuery + '\uf8ff'));
        } else {
            // If no search query is provided, get all profiles
            q = profilesRef;
        }

        const querySnapshot = await getDocs(q);
        const profiles:profileDTO[] = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as profileDTO[]
        return profiles;
    } catch (error) {
        console.error("Error getting profiles: ", error);
        return [];
    }
}