// Загружаем HTTP модуль
var http = require("http");
var fs = require('fs');
//const requestPromise = require('request-promise');
var iniBody;
var hostName;
var portNumber;
var suite;
var name , group , path , project , ext , onlyDir ;
var filesList;
var fName = "" , fBody = "" , m;
//	
//	Экранирование специальных символов
//
function escapeHtml (str) {
	return(str.replace(/&/g,"&amp;"));
};
//
var currentMetod;	//	Метод запроса
//
console.log("Старт скрипта");

//
//
//
function getUrlKeyValue(nKey,xx){
	var key;
	var n = xx.indexOf(nKey+'=',0);
	var m = xx.indexOf('&',n + 1);
	key = xx.substring( n + nKey.length + 1 , m );
	return key;
};
//
//	Функция выбора параметров запроса
//
function requestParser(url){
	suite = url.substring(1,url.indexOf('?'));
	var xx = url.substring(url.indexOf('?') + 1) + '&';
	name = decodeURI(getUrlKeyValue("name",xx));
	group = getUrlKeyValue("group",xx);
	path = getUrlKeyValue("path",xx);
	project = getUrlKeyValue("project",xx);
	ext = getUrlKeyValue("ext",xx);
	onlyDir = getUrlKeyValue("onlyDir",xx);
};
//
//	Асинхронная вычитка файлов
//
function readOneFile(curPath,fl,res){
	console.log("Path = "+curPath);
	console.log("Читаем файл = "+fl);
	fs.readFile(curPath+fl , 'utf-8' , function(err, contents) {
		if (err){
			console.log("error on read file: "+curPath+fl+"\n"+err);
			return;
		};
		fBody = contents;
		filesList = fBody;
		console.log("Размер файла = "+filesList.length);
		res.end(filesList);
	});
};
//
// Создаем HTTP-сервер и слушаем порт 8080 на запросы
//
console.log("Запуск сервера");
http.createServer(function(req, res) {
    var aPath = [];
    var data = '';
    console.log("Обработка запроса");
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS , PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
	res.setHeader('Access-Control-Request-Method', 'POST'); 
    console.log("Параметры определены");
    req.on('data', function(chunk) {
        data += chunk.toString();
		console.log("Получено "+data.length+" байт");
		console.log(data);
	//res.writeHead(200 , {'Content-Type': 'text/plain'});
    });
    // Устанавливаем HTTP-заголовок ответа со статусом HTTP и Content type
    var host = req.headers.host;
    hostName = host.substring(0,host.indexOf(':'));
    portNumber = host.substring(host.indexOf(':') + 1);
    console.log('Запрс пришел от: '+hostName+", на порт № = "+portNumber);
    if(hostName != '127.0.0.1'){
		console.log("Запрс не от: 127.0.0.1");
		res.writeHead(403 , {'Content-Type': 'text/plain'});
		res.end();
    };
    console.log('Url: '+req.url);
    requestParser(req.url);
    console.log("Метод: " + req.method);
    currentMetod = req.method;
    var upName = req.url.substring(1);
	var fpn = "./AngTest"+req.url+".json";
    //
	req.on('end', function() {
    	console.log("req.on = end[" + req.method + "]");
		if(currentMetod == "POST"){
			if( upName == 'workersList' ){
				data = '{ "workersList": ' + data + ' }';
			} else if( upName == 'projectsList' ){
				data = '{ "projectList": ' + data + ' }';
			} else if( upName == 'crossList' ){
				data = '{ "crossList": ' + data + ' }';
			};
			console.log(data);
			data = escapeHtml(data);
			fs.writeFile( fpn , data, (err) => {
  				if (err) {
					console.log("Возникла ошибка при сохранении: "+fpn+"\n"+err); 
					return null;
				} else {
					console.log("Записано "+data.length+" байт в файл: "+fpn);
				};
			});
  			console.log('Файл: '+fpn+' сохранен!');
			console.log("Установим код возврата = 200 & и завершимся");
			res.statusCode = 200;
			res.end();
		} else if(currentMetod == "OPTIONS"){
			console.log("Установим код возврата = 200 & и завершимся");
			res.statusCode = 200;
			res.end();
    	} else if(currentMetod == "DELETE"){
			res.end();                   
    	} else if(currentMetod == "GET"){
			if(req.url == "/workersList"){
				readOneFile("./AngTest/","workersList.json",res);
			} else if(req.url == "/projectList"){
				readOneFile("./AngTest/","projectsList.json",res);
			} else if(req.url == "/crossList"){
				readOneFile("./AngTest/","crossList.json",res);
			};
			//res.end();                   
    	};
    });
    req.on('error', (err) => {
        // This prints the error message and stack trace to `stderr`.
        console.error(err.stack);
    });
}).listen(8080);

// Выводим URL для доступа к серверу
console.log('Server running at http://127.0.0.1:8080/ !!!');