import { Button } from "@/components/ui/button";
import { PaystackConsumer } from "react-paystack";

// import env
const PS_TPK = process.env.NEXT_PUBLIC_PS_TPK;

const config = {
  reference: new Date().getTime().toString(),
  email: "user@example.com",
  amount: 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
  publicKey: PS_TPK,
  currency: "GHS",
};

// you can call this function anything
const handleSuccess = (reference) => {
  // Implementation for whatever you want to do with reference and after success call.
  console.log(reference);
};

// you can call this function anything
const handleClose = () => {
  // implementation for  whatever you want to do when the Paystack dialog closed.
  console.log("closed");
};

const PaymentDialog = () => {
  const componentProps = {
    ...config,
    text: "Paystack Button Implementation",
    onSuccess: (reference) => handleSuccess(reference),
    onClose: handleClose,
  };
  return (
    <div>
      <PaystackConsumer {...componentProps}>
        {({ initializePayment }) => (
          <Button
            onClick={() => initializePayment(handleSuccess, handleClose)}
            className="bg-emerald-500 hover:bg-green-600"
          >
            Make Payment
          </Button>
        )}
      </PaystackConsumer>
    </div>
  );
};

export default PaymentDialog;
