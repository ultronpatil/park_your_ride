import React from "react";
import jsPDF from "jspdf";

function Pay({ onPaymentSuccess }) {
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

  // Function to generate PDF and download it
  const generatePDF = (response) => {
    const pdf = new jsPDF();

    // Add header text
    pdf.setFontSize(18);
    pdf.text(20, 20, "ParkYourRide Payment Receipt");

    // Add payment details
    pdf.setFontSize(12);
    pdf.text(20, 30, `Payment ID: ${response.razorpay_payment_id}`);
    pdf.text(20, 40, `Payment Method: ${response.payment_method || "Unknown"}`); // Assuming payment method type is available

    // Add additional information
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();
    const browserInfo = navigator.userAgent;
    const gatewayProvider = "Razorpay"; // Assuming Razorpay is the gateway provider
    const appName = "ParkYourRide";

    pdf.text(20, 50, `Date: ${currentDate}`);
    pdf.text(20, 60, `Time: ${currentTime}`);
    pdf.text(20, 70, `Browser: ${browserInfo}`);
    pdf.text(20, 80, `Gateway Provider: ${gatewayProvider}`);
    pdf.text(20, 90, `App Name: ${appName}`);

    // Add more content as needed

    // Save and download PDF
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
    let amount = 50;

    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const options = {
      key: "rzp_test_xSvA8DOJ1bJvcC", // Replace with your actual Razorpay API key
      amount: parseInt(amount * 100),
      currency: "INR",
      name: "ParkYourRide",
      description: "Test Transaction",
      image: "https://i.imgur.com/UgWZPTM.png",
      "handler": function (response) {

        alert(response.razorpay_payment_id);

        // Generate PDF
        generatePDF(response);

        // Send the response to your server for further processing and database storage
        sendPaymentDetailsToServer(response, amount); // Pass amount to the function
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

  // Function to send payment details to the server
  const sendPaymentDetailsToServer = (response, amount) => {
    // Create an object with payment details and amount
    const paymentData = {
      paymentDetails: response,
      amount: amount,
    };

    // Make a POST request to your server to save the payment details in the database
    fetch("/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentData), // Send the combined data
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Payment details saved in the database:", data);
      })
      .catch((error) => {
        console.error("Error saving payment details:", error);
      });
  };

  return (
    <div className="PG">
      <button
        className="button_pay"
        onClick={() => {
          pay();
        }}
      >
        Pay & book
      </button>
    </div>
  );
}

export default Pay;













// import React from "react";

// function Pay({ onPaymentSuccess }) {
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

//   const pay = async () => {
//     let amount = 50;

//     const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

//     if (!res) {
//       alert("Razorpay SDK failed to load. Are you online?");
//       return;
//     }

//     const options = {
//       key: "rzp_test_xSvA8DOJ1bJvcC", // Replace with your actual Razorpay API key
//       amount: parseInt(amount * 100),
//       currency: "INR",
//       name: "ParkYourRide",
//       description: "Test Transaction",
//       image: "https://i.imgur.com/UgWZPTM.png",
//       "handler": function (response) {

//         alert(response.razorpay_payment_id,);

//         // handler: function (response) {
//         //   // Log the response for debugging
//         //   console.log("Razorpay Response:", response);

//         // Send the response to your server for further processing and database storage
//         sendPaymentDetailsToServer(response, amount); // Pass amount to the function
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

//   // Function to send payment details to the server
//   const sendPaymentDetailsToServer = (response, amount) => {
//     // Create an object with payment details and amount
//     const paymentData = {
//       paymentDetails: response,
//       amount: amount,
//     };

//     // Make a POST request to your server to save the payment details in the database
//     fetch("/create-order", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(paymentData), // Send the combined data
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("Payment details saved in the database:", data);
//       })
//       .catch((error) => {
//         console.error("Error saving payment details:", error);
//       });
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








// import React from "react";

// function Pay({ onSuccess }) {
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

//   const pay = async () => {
//     let amount = 50;

//     const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

//     if (!res) {
//       alert("Razorpay SDK failed to load. Are you online?");
//       return;
//     }

//     const options = {
//       key: "rzp_test_xSvA8DOJ1bJvcC", // Replace with your actual Razorpay API key
//       amount: parseInt(amount * 100),
//       currency: "INR",
//       name: "ParkYourRide",
//       description: "Test Transaction",
//       image: "https://i.imgur.com/UgWZPTM.png",
//       handler: function (response) {
//         console.log("Razorpay Response:", response);
//         sendPaymentDetailsToServer(response, amount);
//         onSuccess();
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

//   const sendPaymentDetailsToServer = (response, amount) => {
//     const paymentData = {
//       paymentDetails: response,
//       amount: amount,
//     };

//     fetch("/create-order", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(paymentData),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("Payment details saved in the database:", data);
//       })
//       .catch((error) => {
//         console.error("Error saving payment details:", error);
//       });
//   };

//   return (
//     <div className="PG">
//       <button
//         className="button_pay"
//         onClick={() => {
//           pay();
//         }}
//       >
//         Pay with Razorpay
//       </button>
//     </div>
//   );
// }

// export default Pay;
