import { useSelector, useDispatch } from "react-redux";
import { useEffect, Fragment } from "react";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";

import Notification from "./components/UI/Notification";
import { sendCartData,fetchCartData} from './store/cart-actions'

let isInitial = true

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(()=>{
    dispatch(fetchCartData())
  },[dispatch])

  // allows redux to do logic and this allows use to create a side effect not permitted in redux out side of redux
  // one way to create side effect logic when using redux
  // These options are both viable
  useEffect(() => {
    // const sendCartData = async () => {
      
    //   // dispatch(
    //   //   uiActions.showNotification({
    //   //     status: "pending",
    //   //     title: "Sending...",
    //   //     message: "Sending Cart data!",
    //   //   })
    //   // );
    //   // const response = await fetch(
    //   //   "https://redux-cart-2966b-default-rtdb.firebaseio.com/cart.json",
    //   //   {
    //   //     method: "PUT",
    //   //     body: JSON.stringify(cart),
    //   //   }
    //   // );
    //   // if (!response.ok) {
    //   //   throw new Error("Sending Cart data failed");
    //   // }

    //   // dispatch(
    //   //   uiActions.showNotification({
    //   //     status: "success",
    //   //     title: "Success!",
    //   //     message: "Sent Cart data successfully!",
    //   //   })
    //   // );
    // };

    if (isInitial) {
      isInitial = false
      return
    }
    // sendCartData().catch((error) => {
    //   dispatch(
    //     uiActions.showNotification({
    //       status: "error",
    //       title: "Error!",
    //       message: "Sending Cart data failed!",
    //     })
    //   );
    // });

    //----------------------------------------------------------------------------
    if (cart.changed) {

      dispatch(sendCartData(cart))
    }


  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
