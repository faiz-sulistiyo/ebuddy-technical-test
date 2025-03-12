import {User} from "@ebuddy/types";
import {db} from "../config/firebase";
import {calculateScore} from "../utils/score";

export const updateUserDB = async (userId: string, data: Partial<User>) => {
  try {
    const userRef = db.collection("users").doc(userId);
    const doc = await userRef.get();

    if (!doc.exists) {
      throw new Error("User not found");
    }

    const user = doc.data();

    const potentialScore = calculateScore(
      data.totalAverageWeightRatings ?? user?.totalAverageWeightRatings ?? 0,
      data.numberOfRents ?? user?.numberOfRents ?? 0,
      data.recentlyActive ?? user?.recentlyActive ?? 0,
    );

    const request = {
      ...data,
      potentialScore,
    };

    await userRef.update(request);

    return {id: userId, ...request};
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const getUsersDB = async (page: number, limit: number) => {
  try {
    const snapshot = await db
      .collection("users")
      .orderBy("potentialScore", "desc")
      .limit(limit)
      .offset(limit * (page - 1))
      .get();
    if (snapshot.empty) {
      return [];
    }

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as User[];
  } catch (error) {
    console.error("Error retrieving all users:", error);
    throw error;
  }
};

export const countUsersDB = async () => {
  try {
    const snapshot = await db.collection("users").get();
    return snapshot.size;
  } catch (error) {
    console.error("Error counting all users:", error);
    throw error;
  }
};

export const createUserDB = async (data: Partial<User>) => {
  try {
    const userRef = db.collection("users").doc();
    const potentialScore = calculateScore(
      data.totalAverageWeightRatings ?? 0,
      data.numberOfRents ?? 0,
      data.recentlyActive ?? 0,
    );
    const request = {
      ...data,
      potentialScore,
    };
    await userRef.set(request);
    return {id: userRef.id, ...request};
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const deleteUserDB = async (userId: string) => {
  try {
    await db.collection("users").doc(userId).delete();
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
