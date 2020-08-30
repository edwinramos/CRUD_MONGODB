using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace CRUD_APP.DataAccess.DataEntities
{
    public class Person
    {
        [BsonId]
        public ObjectId Id { get; set; }
        public int PersonId { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
    }
}
