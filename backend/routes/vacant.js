app.post("/vacantv1", async (req, res) => {
  try {
    const vacantnotifyv1 = new Vacantnotifyv1(req.body);
    const data = await Vacantnotifyv1.find(req.body);
    console.log(data);
    if (data) {
      const datadel = await Vacantnotifyv1.findOneAndDelete(req.body);
      if (datadel) {
        console.log("data deleted");
      } else if (datadel == null) {
        let result = await vacantnotifyv1.save();
        console.log("saving");
        result = result.toObject();
        const id = JSON.stringify(result._id);
        //console.log(id);
        if (result) {
          res.json({ message: "state changed", data: result });
        } else {
          console.log("state changed");
        }
      } else {
        console.log("neutral");
      }
    } else {
    }
  } catch (e) {
    console.log("wrong");
    res.json({ message: "wrong " });
  }
});