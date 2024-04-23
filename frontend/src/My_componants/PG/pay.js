
// import React, { useState, useEffect } from "react";
// import jsPDF from "jspdf";

// function Pay({ onPaymentSuccess }) {
//   const [userData, setUserData] = useState({});

//   useEffect(() => {
//     fetchUserInfo();
//   }, []);

//   const fetchUserInfo = async () => {
//     try {
//       const response = await fetch("/getdata", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setUserData(data);
//       } else {
//         console.error("Failed to fetch user information:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error fetching user information:", error);
//     }
//   };

//   const loadScript = (src) => {
//     return new Promise((resolve, reject) => {
//       const script = document.createElement("script");
//       script.src = src;
//       script.onload = () => {
//         resolve(true);
//       };
//       script.onerror = () => {
//         reject(false);
//       };
//       document.body.appendChild(script);
//     });
//   };

//   const generatePDF = (response) => {
//     const pdf = new jsPDF();
//     pdf.setFontSize(18);
//     pdf.text(20, 20, "ParkYourRide Payment Receipt");

//     pdf.setFontSize(12);
//     pdf.text(20, 30, `Payment ID: ${response.razorpay_payment_id}`);
//     pdf.text(20, 40, `Payment Method: ${response.payment_method || "Unknown"}`);

//     pdf.text(20, 50, `Name: ${userData.name || "Unknown"}`);
//     pdf.text(20, 60, `Email: ${userData.email || "Unknown"}`);

//     const currentDate = new Date().toLocaleDateString();
//     const currentTime = new Date().toLocaleTimeString();
//     const browserInfo = navigator.userAgent;
//     const gatewayProvider = "Razorpay";
//     const appName = "ParkYourRide";

//     pdf.text(20, 70, `Date: ${currentDate}`);
//     pdf.text(20, 80, `Time: ${currentTime}`);
//     pdf.text(20, 90, `Browser: ${browserInfo}`);
//     pdf.text(20, 100, `Gateway Provider: ${gatewayProvider}`);
//     pdf.text(20, 110, `App Name: ${appName}`);

//     const pdfBlob = pdf.output("blob");
//     const pdfName = "payment_details.pdf";
//     const downloadLink = document.createElement("a");
//     downloadLink.href = URL.createObjectURL(pdfBlob);
//     downloadLink.download = pdfName;
//     document.body.appendChild(downloadLink);
//     downloadLink.click();
//     document.body.removeChild(downloadLink);
//   };

//   const pay = async () => {
//     let amount = 50;

//     const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

//     if (!res) {
//       alert("Razorpay SDK failed to load. Are you online?");
//       return;
//     }

//     const options = {
//       key: "rzp_test_xSvA8DOJ1bJvcC",
//       amount: parseInt(amount * 100),
//       currency: "INR",
//       name: "ParkYourRide",
//       description: "Test Transaction",
//       image: "https://i.imgur.com/UgWZPTM.png",
//       handler: function (response) {
//         alert(response.razorpay_payment_id);
//         generatePDF(response);
//         sendPaymentDetailsToServer(response, amount);
//       },
//       notes: {
//         address: "India",
//       },
//       theme: {
//         color: "#364141",
//       },
//     };

//     const paymentObject = new window.Razorpay(options);
//     paymentObject.open();
//   };

//   const sendPaymentDetailsToServer = async (response, amount) => {
//     const paymentData = {
//       paymentDetails: response,
//       amount: amount,
//     };

//     try {
//       const requestOptions = {
//         mode: 'no-cors',
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(paymentData),
//       };

//       const res = await fetch(`/saverecipt`, requestOptions);

//       if (res.ok) {
//         console.log("Payment receipt saved successfully");
//       } else {
//         console.error("Failed to save payment receipt:", res.statusText);
//       }
//     } catch (error) {
//       console.error("Error saving payment receipt:", error);
//     }
//   };

//   return (
//     <div className="PG">
//       <button
//         className="button_pay"
//         onClick={() => {
//           pay();
//         }}
//       >
//         Pay & book
//       </button>
//     </div>
//   );
// }

// export default Pay;

import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";

function Pay({ onPaymentSuccess, maxSelection, selectedSlots }) {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const response = await fetch("/getdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      } else {
        console.error("Failed to fetch user information:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching user information:", error);
    }
  };

  const loadScript = (src) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        reject(false);
      };
      document.body.appendChild(script);
    });
  };

  const generatePDF = (response, amount) => {
    const pdf = new jsPDF();
    pdf.setFontSize(18);
    pdf.text(20, 20, "ParkYourRide Payment Receipt");

    pdf.setFontSize(12);
    pdf.text(20, 30, `Payment ID: ${response.razorpay_payment_id}`);
    pdf.text(20, 40, `Payment Method: ${response.payment_method || "Unknown"}`);
    pdf.text(20, 50, `Name: ${userData.name || "Unknown"}`);
    pdf.text(20, 60, `Email: ${userData.email || "Unknown"}`);

    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();
    const browserInfo = navigator.userAgent;
    const gatewayProvider = "Razorpay";
    const appName = "ParkYourRide";

    pdf.text(20, 70, `Date: ${currentDate}`);
    pdf.text(20, 80, `Time: ${currentTime}`);
    pdf.text(20, 90, `Browser: ${browserInfo}`);
    pdf.text(20, 100, `Gateway Provider: ${gatewayProvider}`);
    pdf.text(20, 110, `App Name: ${appName}`);

    const totalAmount = amount * selectedSlots.length;
    pdf.text(20, 120, `Total Amount: ${totalAmount} INR`);

    const pdfBlob = pdf.output("blob");
    const pdfName = "payment_details.pdf";
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(pdfBlob);
    downloadLink.download = pdfName;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const pay = async () => {
    const baseAmount = 50;
    let amount = baseAmount * selectedSlots.length;

    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const options = {
      key: "rzp_test_xSvA8DOJ1bJvcC",
      amount: parseInt(amount * 100),
      currency: "INR",
      name: "ParkYourRide",
      description: "Test Transaction",
      image: "https://i.imgur.com/UgWZPTM.png",
      handler: function (response) {
        alert(response.razorpay_payment_id);
        generatePDF(response, baseAmount);
        sendPaymentDetailsToServer(response, amount);
        onPaymentSuccess(); // Call onPaymentSuccess here
      },
      notes: {
        address: "India",
      },
      theme: {
        color: "#364141",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const sendPaymentDetailsToServer = async (response, amount) => {
    const paymentData = {
      paymentDetails: response,
      amount: amount,
    };

    try {
      const requestOptions = {
        mode: 'no-cors',
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      };

      const res = await fetch(`/saverecipt`, requestOptions);

      if (res.ok) {
        console.log("Payment receipt saved successfully");
      } else {
        console.error("Failed to save payment receipt:", res.statusText);
      }
    } catch (error) {
      console.error("Error saving payment receipt:", error);
    }
  };

  return (
    <div className="PG">
      <button
        className="button_pay"
        onClick={pay}
        disabled={selectedSlots.length === 0}
      >
        Pay & book
      </button>
    </div>
  );
}

export default Pay;
