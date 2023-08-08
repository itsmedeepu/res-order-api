const { OrderModule } = require("../model/restOrdermodel");

const RespStructure = () => {
  const resp = {};
  resp.status_code = "";
  resp.message = "";
  resp.data = "";
  return resp;
};

const saveOrder = async (req, res) => {
  try {
    const Order = new OrderModule(req.body);

    await Order.save()
      .then((resp) => {
        const respt = RespStructure();
        respt.status_code = 200;
        respt.message = "order placed sucessfully";
        respt.data = resp;

        res.send(respt);
      })
      .catch((err) => {
        const respt = RespStructure();
        respt.status_code = 200;
        respt.data = null;
        respt.message = "order not placed " + err;
        res.json(respt);
      });
  } catch (err) {
    const respt = RespStructure();
    respt.status_code = 500;
    respt.data = null;
    respt.message = "order not placed " + err;
    res.json(respt);
  }
};

const getOrdersByUser = async (req, res) => {
  try {
    await OrderModule.find({ _id: req.params.id })
      .then((orderslist) => {
        const [{ orders }] = orderslist;

        console.log(orders);
        const respt = RespStructure();
        respt.status_code = 200;
        respt.data = orders;
        respt.message = "orders fetched sucessfully";
        res.json(respt);
      })
      .catch((err) => {
        const respt = RespStructure();
        respt.status_code = 200;
        respt.data = null;
        respt.message = "no order found with this id ";
        res.json(respt);
      });
  } catch (err) {
    const respt = RespStructure();
    respt.status_code = 200;
    respt.data = null;
    respt.message = "something went bad at server side " + err;
    res.json(respt);
  }
};

module.exports = {
  saveOrder,
  getOrdersByUser,
};
