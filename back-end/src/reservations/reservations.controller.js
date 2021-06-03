const service = require("./reservations.service")

async function checkForDate(req, res, next){
  const knexInstance = req.app.get("db");
  const { selectedDate } = req.query;
  if(selectedDate){
    const data = await service.checkForDate(knexInstance, selectedDate);
    res.json({ data });
    return;
  }
  next()
};

async function search(req, res, next){
  const knexInstance = req.app.get("db");
  const { mobile_number } = req.query;
  if(mobile_number){
  const data = await service.search(knexInstance, mobile_number);
  res.status(200).json({data});
  return;
  };
  next();
  return;
};

async function list(req, res) {
  const knexInstance = req.app.get("db");
  const data = await service.list(knexInstance);
  res.json({ data });
  return;
};

async function read(req, res, next){
  const knexInstance = req.app.get("db");
  const { reservation_id } = req.params;
  if(reservation_id){
    const data = await service.read(knexInstance, reservation_id);
    res.status(200).json({ data });
    return;
  };
  next({ status: 404, message: "No Reservation ID" });
};

async function update(req, res, next){
  const knexInstance = req.app.get("db");
  const { reservation_id } = req.params;
  const updatedReservation = req.body;
  console.log("updatedReservation" ,updatedReservation);
  const data = await service.update(knexInstance, reservation_id, updatedReservation);
  res.status(200).json(data)
};
/**2020-12-30 */
module.exports = {
  list: [checkForDate, search, list],
  read,
  update
};
