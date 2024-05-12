const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = (req, res) => {
    /*
        #swagger.tags["Contacts"];
        */
    mongodb
        .getDb("Cluster1")
        .db("project1")
        .collection("contacts")
        .find()
        .toArray((err, lists) => {
            if (err) {
                res.status(400).json({ message: err });
            }
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(lists);
            // const result = await mongodb
            //     .getDb("Cluster1")
            //     .db("project1")
            //     .collection("contacts")
            //     .find();
            // result.toArray().then((contacts) => {
            //     res.setHeader("Content-Type", "application/json");
            //     res.status(200).json(contacts);
            // });
        });
};

const getSingle = (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid contact id to find a contact.');
    }
    /*
        #swagger.tags["Contacts"];
        */
    const contactId = new ObjectId(req.params.id);
    mongodb
        .getDb("Cluster1")
        .db("project1")
        .collection("contacts")
        .find({ _id: contactId })
        .toArray((err, result) => {
            if (err) {
                res.status(400).json({ message: err });
            }
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(result[0]);
        });
  // const result = await mongodb
  //     .getDb("Cluster1")
  //     .db("project1")
  //     .collection("contacts")
  //     .find({ _id: contactId });
  // result.toArray().then((contacts) => {
  //     res.setHeader("Content-Type", "application/json");
  //     res.status(200).json(contacts[0]);
  // });
};


const createContact = async (req, res) => {
    //#swagger.tags["Contacts"];
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDb('Cluster1').db('project1').collection('contacts').insertOne(contact);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res
        .status(500)
        .json(response.error || "Some error ocurred while inserting the user.");
    }
};

const updateContact = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json("Must use a valid contact id to update a contact.");
    }
    //#swagger.tags["Contacts"];
    const contactId = new ObjectId(req.params.id);
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDb('Cluster1').db('project1').collection('contacts').replaceOne({ _id: contactId }, contact);

    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res
        .status(500)
        .json(response.error || "Some error ocurred while updating the user.");
    }
};

const deleteContact = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json("Must use a valid contact id to delete a contact.");
    }
    //#swagger.tags["Contacts"];
    const contactId = new ObjectId(req.params.id);
    const response = await mongodb.getDb('Cluster1').db('project1').collection('contacts').deleteOne({ _id: contactId });

    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res
        .status(500)
        .json(response.error || "Some error occurred while removing the user.");
    }
};

module.exports = {
    getAll,
    getSingle,
    createContact,
    updateContact,
    deleteContact
};