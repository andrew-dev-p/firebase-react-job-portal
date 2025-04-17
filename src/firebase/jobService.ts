import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, updateDoc, where } from "firebase/firestore";
import { fireDB } from "./firebaseConfig";
import moment from "moment";
import { JobFormValues } from "../pages/user/PostedJobs/NewEditJob";
import { ApplicationFormValues } from "../pages/JobDescription";

export const addNewJobPost = async (payload: JobFormValues) => {
  const user = JSON.parse(localStorage.getItem("user") ?? "{}");

  try {
    await addDoc(collection(fireDB, 'jobs'), {
      ...payload,
      status: 'pending',
      postedByUserId: user.id,
      postedByUserName: user.name,
      postedOn: moment().format("DD-MM-YYYY HH:mm A")
    })
    return {
      success: true,
      message: "Job added successfully",
    }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    }
  }
}

export const getPostedJobsByUserId = async (userId: string) => {
  try {
    const jobs: JobFormValues[] = [];
    const qry = query(collection(fireDB, "jobs"), orderBy("postedOn", "desc"));
    const querySnapshot = await getDocs(qry);
    querySnapshot.forEach((doc) => {
      if (doc.data().postedByUserId === userId) {
        const data = doc.data();
        jobs.push({
          id: doc.id,
          title: data.title || "",
          industry: data.industry || "",
          location: data.location || "",
          company: data.company || "",
          salary: data.salary || "",
          jobType: data.jobType || "",
          lastDateToApply: data.lastDateToApply || "",
          experience: data.experience || "",
          noticePeriod: data.noticePeriod || "",
          jobDescription: data.jobDescription || "",
          status: data.status,
          postedByUserId: data.postedByUserId,
          postedByUserName: data.postedByUserName,
          postedOn: data.postedOn,
        });
      }
    });
    return {
      success: true,
      data: jobs,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    };
  }
};

export const getJobById = async (id: string) => {
  try {
    const docSnap = await getDoc(doc(fireDB, "jobs", id));
    
    if (docSnap.exists()) {
      return {
        success: true,
        data: docSnap.data(),
      };
    } else {
      return {
        success: false,
        message: "Job not found",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    };
  }
};

export const editJobDetails = async (payload: Partial<JobFormValues>) => {
  try {
    if (!payload.id) {
      throw new Error("Job ID is required to update job details.");
    }
    await updateDoc(
      doc(fireDB, "jobs", payload.id),
      { ...payload, updatedOn: moment().format("DD-MM-YYYY HH:mm A") }
    );
    return {
      success: true,
      message: "Job updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    };
  }
};

export const deleteJobById = async (id: string) => {
  try {
    await deleteDoc(doc(fireDB, "jobs", id));
    return {
      success: true,
      message: "Job deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    };
  }
};

export const getAllJobs = async () => {
  try {
    const jobs: JobFormValues[] = [];
    const qry = query(collection(fireDB, "jobs"), orderBy("postedOn", "desc"));
    const querySnapshot = await getDocs(qry);
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      jobs.push({
        id: doc.id,
        title: data.title || "",
        industry: data.industry || "",
        location: data.location || "",
        company: data.company || "",
        salary: data.salary || "",
        jobType: data.jobType || "",
        lastDateToApply: data.lastDateToApply || "",
        experience: data.experience || "",
        noticePeriod: data.noticePeriod || "",
        jobDescription: data.jobDescription || "",
        status: data.status,
        postedByUserId: data.postedByUserId,
        postedByUserName: data.postedByUserName,
        postedOn: data.postedOn,
      });
    });
    return {
      success: true,
      data: jobs,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    };
  }
};

export const applyJobPost = async (payload: JobFormValues) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  
  try {
    await addDoc(collection(fireDB, "applications"), {
      jobId: payload.id,
      jobTitle: payload.title,
      company: payload.company,
      userId: user.id,
      userName: user.name,
      email: user.email,
      phoneNumber: user?.phoneNumber || "",
      appliedOn: moment().format("DD-MM-YYYY HH:mm A"),
      status: "pending",
    });
    return {
      success: true,
      message: "Application submitted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    };
  }
}

export const getApplicationsByUserId = async (id: string) => {
  try {
    const applications: ApplicationFormValues[] = [];
    const qry = query(collection(fireDB, "applications"), where("userId", "==", id));
    const querySnapshot = await getDocs(qry);
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      applications.push({
        id: doc.id,
        jobId: data.jobId,
        jobTitle: data.jobTitle,
        company: data.company,
        userId: data.userId,
        userName: data.userName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        appliedOn: data.appliedOn,
        status: data.status,
      });
    });
    return {
      success: true,
      data: applications,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    };
  }
};

export const getApplicationsByJobId = async (id: string) => {
  try {
    const applications: ApplicationFormValues[] = [];
    const qry = query(collection(fireDB, "applications"), where("jobId", "==", id));
    const querySnapshot = await getDocs(qry);
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      applications.push({
        id: doc.id,
        jobId: data.jobId,
        jobTitle: data.jobTitle,
        company: data.company,
        userId: data.userId,
        userName: data.userName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        appliedOn: data.appliedOn,
        status: data.status,
      });
    });
    return {
      success: true,
      data: applications,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    };
  }
};

export const getAllApplications = async () => {
  try {
    const applications: ApplicationFormValues[] = [];
    const qry = query(collection(fireDB, "applications"));
    const querySnapshot = await getDocs(qry);
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      applications.push({
        id: doc.id,
        jobId: data.jobId,
        jobTitle: data.jobTitle,
        company: data.company,
        userId: data.userId,
        userName: data.userName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        appliedOn: data.appliedOn,
        status: data.status,
      });
    });
    return {
      success: true,
      data: applications,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    };
  }
};