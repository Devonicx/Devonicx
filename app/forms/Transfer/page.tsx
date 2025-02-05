"use client";

import BusinessForms from "@/app/components/BusinessForms";

const Transfer: React.FC = () => {
  const inputArray = [
    { label: "company Name", name: "companyName", type: "text" },
    { label: "agent Name", name: "agentName", type: "text" },
    { label: "business Phone", name: "bussPhoneNumber", type: "number" },
    { label: "ownerName", name: "ownerName", type: "text" },
    { label: "personal Phone", name: "personalPhoneNumber", type: "number" },
    { label: "business Email", name: "bussEmail", type: "text" },
    { label: "personal Email", name: "personalEmail", type: "text" },
    { label: "website Link", name: "websiteLink", type: "text" },
    { label: "yelp Link", name: "yelpLink", type: "text" },
    { label: "services Offered", name: "servicesOffered", type: "text" },
    { label: "services", name: "services", type: "text" },
    { label: "areas", name: "areas", type: "text" },
    { label: "keyword", name: "keyword", type: "text" },
    { label: "payment Method", name: "paymentMethod", type: "text" },
    { label: "notes", name: "notes", type: "text" },
    { label: "price Pitched", name: "pricePitched", type: "number" },
    { label: "scheduled Date", name: "scheduledDate", type: "date" },
    { label: "scheduled Time", name: "scheduledTime", type: "time" },
  ];
  return <BusinessForms type={"Transfer"} inputArray={inputArray} />;
};

export default Transfer;
