const events = require("events");
const audit = require("../model/auditModel");
const queries = require("../db/queires"),
    dbConnection = require("../db/connection");

let emitter = new events.EventEmitter();

const auditEvent = "audit";

emitter.on(
    auditEvent,
    ({ auditAction, data, status, error, auditBy, auditOn }) => {
        // steps of actions - save to db
        try {
            let values = [
                auditAction,
                JSON.stringify(data),
                status,
                error,
                auditBy,
                auditOn,
            ];
            let auditQuery = queries.queryList.AUDIT_INSERT_QUERY;
            dbConnection.dbQuery(auditQuery, values);
        } catch (error) {
            console.log(`Audited failed: ${error}`);
        }
    }
);

exports.prepareAudit = (auditAction, data, error, auditBy, auditOn) => {
    let status = 200;

    if (error) {
        status = 500;
    }

    let auditObj = new audit.Audit(
        auditAction,
        data,
        status,
        error,
        auditBy,
        auditOn
    );

    emitter.emit(auditEvent, auditObj);
};
