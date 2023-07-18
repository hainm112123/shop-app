export const cancel = async (req, res) => {
  let { user } = res.locals;
  const { itemId } = req.params;
  const index = user.orders.findIndex((item) => item._id.toString() === itemId);
  if (index === -1) {
    return res.status(401).send('Invalid order cancellation');
  }
  user.orders.splice(index, 1);
  user = await user.save();
  return res.json(user.orders);
}

export const received = async (req, res) => {
  let { user } = res.locals;
  const { itemId } = req.params;
  const index = user.orders.findIndex((item) => item._id.toString() === itemId);
  if (index === -1 || user.orders[index].state === 'complete') {
    return res.status(401).send('Invalid order receiving');
  }
  user.orders[index].state = 'complete';
  user = await user.save();
  return res.json(user.orders);
}