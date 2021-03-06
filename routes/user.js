
/*
 * GET users listing.
 */
var config = require('./../config.js');
var mysql = require('mysql');
var errormap = require('./../public/javascripts/error.js');

connection = mysql.createConnection(config.dbconfig);
//connection.query('USE express');

exports.get_call = function(req, res) {
    if (typeof (req.param("db_name")) !== 'undefined') {
        // if requested database exists we gonna "use" that database
        connection.query('USE ' + req.param("db_name"), function(err, rows) {
            if (!err) {

                if (typeof (req.param("table_name")) !== 'undefined') {
                    if ((typeof (req.query.limit) !== 'undefined') && (typeof (req.query.by) == 'undefined') && (typeof (req.query.order) == 'undefined')) {
                        // if limit we gonna put limit in query
                        connection.query('SELECT * FROM ' + req.param("table_name") + ' LIMIT ' + req.query.limit, function(err, rows) {
                            if (!err) {
                                res.set({'status': '200 OK'});
                                res.json({"data": rows});
                            } else {
                                var e = errormap.sql_to_http[err['code']];
                                var msg = err['code'];
                                var message = {'status': '400 Bad Request',
                                    'X-Sql-Error-Code': e,
                                    'X-Sql-Error-Message': msg
                                };
                                res.set(message);
                                res.json(message);

                            }

                        });
                    }
                    if ((typeof (req.query.limit) !== 'undefined') && (typeof (req.query.by) !== 'undefined') && (typeof (req.query.order) == 'undefined')) {
                        connection.query('SELECT * FROM ' + req.param("table_name") + ' ORDER BY ' + req.query.by + ' LIMIT ' + req.query.limit, function(err, rows) {
                            if (!err) {
                                res.set({'status': '200 OK'});
                                res.json({"data": rows});
                            } else {
                                var e = errormap.sql_to_http[err['code']];
                                var msg = err['code'];
                                var message = {'status': '400 Bad Request',
                                    'X-Sql-Error-Code': e,
                                    'X-Sql-Error-Message': msg
                                };
                                res.set(message);
                                res.json(message);

                            }

                        });
                    }

                    if ((typeof (req.query.by) !== 'undefined') && (typeof (req.query.order) !== 'undefined')) {
                        if (typeof (req.query.limit) !== 'undefined') {
                            console.log('SELECT * FROM ' + req.param("table_name") + ' ORDER BY ' + req.query.by + ' ' + req.query.order + ' LIMIT ' + req.query.limit);
                            // if order by field name and limit comes we gonna put order by amd limit in query
                            connection.query('SELECT * FROM ' + req.param("table_name") + ' ORDER BY ' + req.query.by + ' ' + req.query.order + ' LIMIT ' + req.query.limit, function(err, rows) {
                                if (!err) {
                                    res.set({'status': '200 OK'});
                                    res.json({"data": rows});
                                } else {
                                    var e = errormap.sql_to_http[err['code']];
                                    var msg = err['code'];
                                    var message = {'status': '400 Bad Request',
                                        'X-Sql-Error-Code': e,
                                        'X-Sql-Error-Message': msg
                                    };
                                    res.set(message);
                                    res.json(message);

                                }

                            });
                        } else {
                            // if order by field name comes we gonna put order by in query
                            connection.query('SELECT * FROM ' + req.param("table_name") + ' ORDER BY ' + req.query.by + ' ' + req.query.order, function(err, rows) {
                                if (!err) {
                                    res.set({'status': '200 OK'});
                                    res.json({"data": rows});
                                } else {
                                    var e = errormap.sql_to_http[err['code']];
                                    var msg = err['code'];
                                    var message = {'status': '400 Bad Request',
                                        'X-Sql-Error-Code': e,
                                        'X-Sql-Error-Message': msg
                                    };
                                    res.set(message);
                                    res.json(message);

                                }

                            });
                        }


                    }
                    if ((typeof (req.param("table_name")) !== 'undefined') && (typeof (req.query.limit) == 'undefined') && (typeof (req.query.by) == 'undefined') && (typeof (req.query.order) == 'undefined')) {
                        // if table name exists we gonna execute    
                        connection.query('SELECT * FROM ' + req.param("table_name"), function(err, rows) {
                            if (!err) {
                                res.set({'status': '200 OK'});
                                res.json({"data": rows});
                            } else {
                                var e = errormap.sql_to_http[err['code']];
                                var msg = err['code'];
                                var message = {'status': '400 Bad Request',
                                    'X-Sql-Error-Code': e,
                                    'X-Sql-Error-Message': msg
                                };
                                res.set(message);
                                res.json(message);

                            }

                        });
                    }
                }
            } else {
                var e = errormap.sql_to_http[err['code']];
                var msg = err['code'];
                var message = {'status': '400 Bad Request',
                    'X-Sql-Error-Code': e,
                    'X-Sql-Error-Message': msg
                };
                res.set(message);
                res.json(message);
            }
        });
    } else {
        res.set({'status': '400 Bad Request'});
    }
};

exports.get_callbyid = function(req, res) {
    if (typeof (req.param("db_name")) !== 'undefined') {
        // if requested database exists we gonna "use" that database
        connection.query('USE ' + req.param("db_name"), function(err, rows) {
            if (!err) {
                if ((typeof (req.param("table_name")) !== 'undefined') && (typeof (req.param("id")) !== 'undefined')) {
                    // if table name exists we gonna execute 
                    connection.query('SELECT * FROM ' + req.param("table_name") + ' WHERE id = ' + req.param("id"), function(err, rows) {
                        if (!err) {
                            res.set({'status': '200 OK'});
                            res.json({"data": rows});
                        } else {
                            var e = errormap.sql_to_http[err['code']];
                            var msg = err['code'];
                            var message = {'status': '400 Bad Request',
                                'X-Sql-Error-Code': e,
                                'X-Sql-Error-Message': msg
                            };
                            res.set(message);
                            res.json(message);

                        }
                    });
                } else {
                    res.set({'status': '400 Bad Request'});
                    res.json({"message": "Check your table name or id"});
                }
            } else {
                var e = errormap.sql_to_http[err['code']];
                var msg = err['code'];
                var message = {'status': '400 Bad Request',
                    'X-Sql-Error-Code': e,
                    'X-Sql-Error-Message': msg
                };
                res.set(message);
                res.json(message);
            }


        });
    } else {
        res.set({'status': '400 Bad Request'});
    }
};
exports.get_callbylike = function(req, res) {
    if (typeof (req.param("db_name")) !== 'undefined') {
        // if requested database exists we gonna "use" that database
        connection.query('USE ' + req.param("db_name"), function(err, rows) {
            if (!err) {
                if ((typeof (req.param("table_name")) !== 'undefined') && (typeof (req.param("column_name")) !== 'undefined') && (typeof (req.param("value")) !== 'undefined')) {
                    // if table name exists we gonna execute 
                    connection.query('SELECT * FROM ' + req.param("table_name") + ' WHERE ' + req.param("column_name") + ' LIKE "%' + req.param("value") + '%"', function(err, rows) {
                        if (!err) {
                            res.set({'status': '200 OK'});
                            res.json({"data": rows});
                        } else {
                            var e = errormap.sql_to_http[err['code']];
                            var msg = err['code'];
                            var message = {'status': '400 Bad Request',
                                'X-Sql-Error-Code': e,
                                'X-Sql-Error-Message': msg
                            };
                            res.set(message);
                            res.json(message);

                        }

                    });
                } else {
                    res.set({'status': '400 Bad Request'});
                }

            } else {
                var e = errormap.sql_to_http[err['code']];
                var msg = err['code'];
                var message = {'status': '400 Bad Request',
                    'X-Sql-Error-Code': e,
                    'X-Sql-Error-Message': msg
                };
                res.set(message);
                res.json(message);
            }
        });
    } else {
        res.set({'status': '400 Bad Request'});
    }
};
exports.insert_into = function(req, res) {
    if (typeof (req.param('db_name')) !== 'undefined') {
        connection.query('USE ' + req.param("db_name"), function(err, rows) {
            if (!err) {
                if ((typeof (req.param('table_name')) !== 'undefined') && (typeof (req.body) !== 'undefined')) {
                    var query = 'INSERT INTO ' + req.param('table_name') + ' (';
                    var count = 0;
                    for (x in req.body) {
                        count++;
                    }
                    var cnt = 0;
                    for (x in req.body) {
                        if (cnt !== count) {
                            query += x;
                        }
                        if (cnt < count - 1) {
                            query += ',';
                        }
                        cnt++;
                    }
                    query += ') VALUES ( ';
                    var cnt = 0;
                    for (x in req.body) {
                        if (cnt !== count) {
                            query += '"' + req.body[x] + '"';
                        }
                        if (cnt < count - 1) {
                            query += ',';
                        }
                        cnt++;

                    }
                    query += ')';
                    console.log(query);
                    connection.query(query, function(err, rows) {
                        if (!err) {
                            res.set({'status': '200 OK'});
                            res.json(rows);
                        } else {
                            var e = errormap.sql_to_http[err['code']];
                            var msg = err['code'];
                            var message = {'status': '400 Bad Request',
                                'X-Sql-Error-Code': e,
                                'X-Sql-Error-Message': msg
                            };
                            res.set(message);
                            res.json(message);
                        }

                    });
                }

            } else {
                var e = errormap.sql_to_http[err['code']];
                var msg = err['code'];
                var message = {'status': '400 Bad Request',
                    'X-Sql-Error-Code': e,
                    'X-Sql-Error-Message': msg
                };
                res.set(message);
                res.json(message);
            }
        });

    } else {
        res.set({'status': '400 Bad Request'});
    }

};


exports.update_byid = function(req, res) {
    if (typeof (req.param('db_name')) !== 'undefined') {
        connection.query('USE ' + req.param("db_name"), function(err, rows) {
            if (!err) {
                if ((typeof (req.param('table_name')) !== 'undefined') && (typeof (req.param('id')) !== 'undefined') && (typeof (req.body) !== 'undefined')) {
                    var query = 'UPDATE ' + req.param('table_name') + ' SET ';
                    var count = 0;
                    for (x in req.body) {
                        count++;
                    }
                    var cnt = 0;
                    for (x in req.body) {
                        if (cnt !== count) {
                            query += x + ' = ' + '"' + req.body[x] + '"';
                        }
                        if (cnt < count - 1) {
                            query += ' , ';
                        }
                        cnt++;
                    }
                    query += ' WHERE id = ' + req.param('id');
                    connection.query(query, function(err, rows) {
                        if (!err) {
                            res.set({'status': '200 OK'});
                            res.json({data: rows});
                        } else {
                            var e = errormap.sql_to_http[err['code']];
                            var msg = err['code'];
                            var message = {'status': '400 Bad Request',
                                'X-Sql-Error-Code': e,
                                'X-Sql-Error-Message': msg
                            };
                            res.set(message);
                            res.json(message);

                        }

                    });
                } else {
                    res.set({'status': '400 Bad Request'});
                }

            } else {
                var e = errormap.sql_to_http[err['code']];
                var msg = err['code'];
                var message = {'status': '400 Bad Request',
                    'X-Sql-Error-Code': e,
                    'X-Sql-Error-Message': msg
                };
                res.set(message);
                res.json(message);

            }


        });
    } else {
        res.set({'status': '400 Bad Request'});
    }
};
exports.delete_byid = function(req, res) {
    if (typeof (req.param('db_name')) !== 'undefined') {
        connection.query('USE ' + req.param("db_name"), function(err, rows) {
            if (!err) {
                if ((typeof (req.param('table_name')) !== 'undefined') && (typeof (req.param('id')) !== 'undefined')) {

                    connection.query('DELETE FROM ' + req.param('table_name') + ' WHERE id = ' + req.param('id'), function(err, rows) {
                        if (!err) {
                            res.set({'status': '200 OK'});
                            res.json({data: rows});
                        } else {
                            var e = errormap.sql_to_http[err['code']];
                            var msg = err['code'];
                            var message = {'status': '400 Bad Request',
                                'X-Sql-Error-Code': e,
                                'X-Sql-Error-Message': msg
                            };
                            res.set(message);
                            res.json(message);

                        }

                    });
                }

            } else {
                var e = errormap.sql_to_http[err['code']];
                var msg = err['code'];
                var message = {'status': '400 Bad Request',
                    'X-Sql-Error-Code': e,
                    'X-Sql-Error-Message': msg
                };
                res.set(message);
                res.json(message);


            }


        });
    } else {
        res.set({'status': '400 Bad Request'});
    }
};
exports.create_db = function(req, res) {
    if (typeof (req.param('db_name')) !== 'undefined') {
        connection.query('CREATE DATABASE ' + req.param('db_name'), function(err, rows) {
            if (!err) {
                res.set({'status': '200 OK'});
                res.json(rows);
                //res.json({'message': "Database created successfully"});

            } else {
                var e = errormap.sql_to_http[err['code']];
                var msg = err['code'];
                var message = {'status': '400 Bad Request',
                    'X-Sql-Error-Code': e,
                    'X-Sql-Error-Message': msg
                };
                res.set(message);
                res.json(message);
            }
        });
    }
};
exports.create_table = function(req, res) {
    if (typeof (req.param('db_name')) !== 'undefined') {
        connection.query('USE ' + req.param("db_name"), function(err, rows) {
            if (!err) {
                if ((typeof (req.param('table_name')) !== 'undefined') && (typeof (req.param('primary_key')) !== 'undefined') && (typeof (req.param('columns')) !== 'undefined')) {
                    var col = JSON.parse(req.body.columns);
                    var query = 'CREATE TABLE ' + req.param('table_name') + ' ( '
                    for (x in col) {
                        query += x + ' ' + col[x] + ' , ';
                    }
                    query += 'PRIMARY KEY(' + req.param('primary_key') + ') )';
                    connection.query(query, function(err, rows) {
                        if (!err) {
                            res.set({'status': '200 OK'});
                            res.json(rows);
                        } else {
                            var e = errormap.sql_to_http[err['code']];
                            var msg = err['code'];
                            var message = {'status': '400 Bad Request',
                                'X-Sql-Error-Code': e,
                                'X-Sql-Error-Message': msg
                            };
                            res.set(message);
                            res.json(message);

                        }
                    });

                }

            } else {
                var e = errormap.sql_to_http[err['code']];
                var msg = err['code'];
                var message = {'status': '400 Bad Request',
                    'X-Sql-Error-Code': e,
                    'X-Sql-Error-Message': msg
                };
                res.set(message);
                res.json(message);
            }
        });
    } else {
        res.set({'status': '400 Bad Request'});
    }
};
exports.delete_db = function(req, res) {
    if (typeof (req.param('db_name')) !== 'undefined') {
        connection.query('DROP DATABASE ' + req.param('db_name'), function(err, rows) {
            if (!err) {
                res.set({'status': '200 OK'});
                res.json(rows);
            } else {
                var e = errormap.sql_to_http[err['code']];
                var msg = err['code'];
                var message = {'status': '400 Bad Request',
                    'X-Sql-Error-Code': e,
                    'X-Sql-Error-Message': msg
                };
                res.set(message);
                res.json(message);
            }

        });
    }
    else {
        res.set({'status': '400 Bad Request'});
    }
};
exports.delete_table = function(req, res) {
    if (typeof (req.param('db_name')) !== 'undefined') {
        connection.query('USE ' + req.param("db_name"), function(err, rows) {
            if (!err) {
                if (typeof (req.param('table_name')) !== 'undefined') {
                    connection.query('DROP TABLE ' + req.param('table_name'), function(err, rows) {
                        res.set({'status': '200 OK'});
                        res.json({'data': rows});
                    });
                }

            } else {
                var e = errormap.sql_to_http[err['code']];
                var msg = err['code'];
                var message = {'status': '400 Bad Request',
                    'X-Sql-Error-Code': e,
                    'X-Sql-Error-Message': msg
                };
                res.set(message);
                res.json(message);

            }

        });
    } else {
        res.set({'status': '400 Bad Request'});
    }
};