import React from "react";
import Layout from "components/style/Layout";
import OrderConfirm from "components/order/OrderConfirm";
import { postDataWithUrl } from "services/api";

// export const getServerSideProps = async (context) => {

//   await postDataWithUrl(`${process.env.HOST}/api/payment/success`, {
//     transactionId: context.params.transactionId,
//   });

//   const metaInfo = {
//     title: "Order Confirm | Keyvendors.com",
//     keyword:
//       "Keyvendors,certified local home service, waterproofing, interior designer,",
//     description:
//       "Keyvendors is a credible marketplace for certified local home service experts including AC service, waterproofing, interior designer, RO Service in Delhi NCR",
//   };

//   return {
//     props: {
//       transactionId: context.params.transactionId,
//       metaInfo,
//     },
//   };
// };

function OrderConfirmPage({ transactionId }) {
  return (
    <Layout sx={{ bgcolor: "#FBFBFB" }}>
      <OrderConfirm transactionId={transactionId} />
    </Layout>
  );
}

export default OrderConfirmPage;
