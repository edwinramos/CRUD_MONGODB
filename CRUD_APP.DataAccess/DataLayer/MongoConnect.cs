using CRUD_APP.DataAccess.DataEntities;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CRUD_APP.DataAccess.DataLayer
{
    static public class MongoConnect
    {
        static MongoClient client = new MongoClient("mongodb+srv://admin:demo@cluster0.yuqyh.mongodb.net/crud_test?retryWrites=true&w=majority");

        private static IMongoCollection<BsonDocument> GetCollection(string collection)
        {
            var database = client.GetDatabase("crud_test");
            var col = database.GetCollection<BsonDocument>(collection);


            return col;
        }
        public static IMongoCollection<Person> GetPersons()
        {
            var database = client.GetDatabase("crud_test");
            var col = database.GetCollection<Person>("person");

            var indexBuilder = Builders<Person>.IndexKeys;
            //var options = new CreateIndexOptions 
            //{

            //};

            var indexModel = new CreateIndexModel<Person>(indexBuilder.Ascending(x => x.PersonId));
            col.Indexes.CreateOne(indexModel);

            return col;
        }
        public static Person GetPerson(int id)
        {
            var database = client.GetDatabase("crud_test");
            var collection = database.GetCollection<Person>("person");

            var query_id = Builders<Person>.Filter.Eq("PersonId", id);

            return collection.Find(query_id).FirstOrDefault();
        }

        public static void Insert(Person person)
        {
            var collection = GetPersons();

            if (collection.AsQueryable().Any())
                person.PersonId = collection.AsQueryable().Max(x => x.PersonId) + 1;
            else
                person.PersonId = 1;

            collection.InsertOne(person);
        }

        public static void Update(Person person)
        {
            var collection = GetCollection("person");
            var query_id = Builders<BsonDocument>.Filter.Eq("PersonId", person.PersonId);

            var obj = GetPerson(person.PersonId);
            person.Id = obj.Id;


            collection.FindOneAndReplace(query_id, person.ToBsonDocument());
        }

        public static void Delete(int id)
        {
            var collection = GetCollection("person");
            var query_id = Builders<BsonDocument>.Filter.Eq("PersonId", id);

            collection.FindOneAndDelete(query_id);
        }
    }
}
