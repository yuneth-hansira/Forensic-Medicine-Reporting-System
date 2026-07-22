const fs = require('fs');
const path = require('path');
const pool = require('./config/db');

async function initializeDatabase() {
    try {
        console.log('Starting database initialization...');
        
        // Read schema and seed files
        const schemaPath = path.join(__dirname, 'database', 'schema.sql');
        const seedPath = path.join(__dirname, 'database', 'seed.sql');
        
        const schemaSql = fs.readFileSync(schemaPath, 'utf8');
        const seedSql = fs.readFileSync(seedPath, 'utf8');
        const advancedPath = path.join(__dirname, 'database', 'advanced_scripts.sql');
        const advancedSql = fs.readFileSync(advancedPath, 'utf8');
        
        // Split queries by semicolon (this is a simple parser, might fail on complex SQL with semicolons inside strings)
        // For robust execution, it's better to use multipleStatements: true in mysql connection, 
        // but for now, we'll execute it as a single block if possible, or split it.
        
        // To run multiple statements, we need a connection with multipleStatements: true
        const mysql = require('mysql2/promise');
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            port: process.env.DB_PORT || 3306,
            multipleStatements: true
        });

        console.log('Executing schema...');
        await connection.query(schemaSql);
        
        console.log('Executing advanced scripts (DML, queries, views, triggers, SPs)...');
        // This includes seed data as well, so we don't need to run seed.sql separately if advanced_scripts.sql has everything.
        // Actually, advanced_scripts has a lot of DML. Let's just run both or only advanced depending on structure.
        // The user provided advanced scripts which contains sample data. 
        await connection.query(advancedSql);
        
        console.log('Database initialized successfully!');
        await connection.end();
        process.exit(0);
    } catch (error) {
        console.error('Error initializing database:', error);
        process.exit(1);
    }
}

initializeDatabase();
