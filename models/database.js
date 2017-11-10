const pg = require('pg');
const connectionString = process.env.DATABASE_URL;

const client = new pg.Client(connectionString);
client.connect();
const query = client.query(
    'CREATE TABLE ulid\n' +
    '(\n' +
    '    md5 UUID NOT NULL,\n' +
    '    xws JSON NOT NULL\n' +
    ');\n' +
    'CREATE UNIQUE INDEX ulid_md5_uindex ON ulid (md5);');
query.on('end', () => { client.end(); });


