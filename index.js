let app = angular.module('myapp', ["ngRoute"]);
//Config 
app.config(function ($routeProvider) {
    $routeProvider
        .when("/", { templateUrl: "view/main.html", controller: "monHoc" })
        .when("/home", { templateUrl: "view/main.html", controller: "monHoc" })
        .when("/dangnhap", { templateUrl: "view/dangnhap.html", controller: "formDN" })
        .when("/lienhe", { templateUrl: "view/lienHe.html", controller: "" })
        .when("/dangki", { templateUrl: "view/dangKi.html", controller: "formDK" })
        .when("/doimatkhau", { templateUrl: "view/doimatkhau.html", controller: "doimatkhau" })
        .when("/tracnghiem/:idMH/:tenMH", { templateUrl: "view/Pagetracnghiem.html", controller: 'tnctrl' })
        .when("/:ten", { templateUrl: "view/gioithieu.html", controller: "hientin" })
});
//Controller
app.controller("monHoc", function ($scope, $http) {
    $scope.cacmonhoc = [];
    $http.get("db/Subjects.js").then(
        function (r) { $scope.cacmonhoc = r.data; },
        function (d) {
            alert("Error" + d.statusText);

        });
    //Action
    $scope.start = 0;
    $scope.pageSize = 6;
    $scope.next = function () {
        trangcuoi = ($scope.cacmonhoc.length - $scope.pageSize);
        if ($scope.start < $scope.cacmonhoc.length - $scope.pageSize)
            $scope.start += $scope.pageSize;

    };

    $scope.back = function () {
        if ($scope.start > 0)
            $scope.start -= $scope.pageSize;
    };

    let ht = sessionStorage.getItem("hoten");
    if (ht != "") $scope.hoten = ht;
    let e = sessionStorage.getItem("email");
    if (e != "") $scope.email = e;
    
// Dang xuat
    $scope.logout = function(){
        if($scope.hoten !=" "){
            sessionStorage.clear();
            document.location = 'http://127.0.0.1:5501/index.html#!/home';
            window.location.reload('http://127.0.0.1:5501/index.html#!/home');
        }
    }
});

app.controller("tnctrl", function ($scope, $http, $routeParams) {
    $scope.caccauhoi = [];
    $scope.idMH = $routeParams.idMH;
    $scope.tenMH = $routeParams.tenMH;
    $http.get("db/Quizs/" + $scope.idMH + ".js").then(
        function (r) { $scope.caccauhoi = r.data; },
        function (d) { alert("Error"); }
    );
    //Action
    $scope.start = 0;
    $scope.pageSize = 1;

    $scope.next = function () {
        trangcuoi = ($scope.caccauhoi.length - $scope.pageSize);
        if ($scope.start < $scope.caccauhoi.length - $scope.pageSize)
            $scope.start += $scope.pageSize;
    };

    $scope.back = function () {
        if ($scope.start > 0)
            $scope.start -= $scope.pageSize;
    };

});

app.controller("hientin", function ($scope, $http, $routeParams) {
    $scope.listtin = [];
    let tenfile = $routeParams.ten;  // the thao
    let url = "tin/" + tenfile + ".js";
    $http.get(url).then(
        function (r) { $scope.listtin = r.data; },
        function (d) { alert("Error" + d.statusText); });
});

app.controller('formDN', function ($scope, $http) {
    $scope.listsv = [];
    $http.get("db/Students.js").then(
        function (r) { $scope.listsv = r.data; },
        function (d) { alert("Error"); }
    );
    $scope.check = function () {
        let email = $scope.e;
        let pass = $scope.p;
        let tc = false;
        $scope.tc = tc;
        let motsv = [];
        for (let i = 0; i < $scope.listsv.length; i++) {
            motsv = $scope.listsv[i];
            if (email == motsv.email && pass == motsv.password) {
                tc = true;
                break;
            }
        }
        if (tc) {
            sessionStorage.setItem('username', motsv.u);
            sessionStorage.setItem('hoten', motsv.fullname);
            sessionStorage.setItem('email', motsv.email);
            document.location = 'http://127.0.0.1:5501/index.html#!/home';
            window.location.reload('http://127.0.0.1:5501/index.html#!/home');
        }else{
            $scope.Thongbao="Sai mật khẩu hoặc email đăng nhập";
        }
    }
});

app.controller('formDK', function ($scope,$http ) {
    $scope.listsv = [];
    $http.get("db/Students.js").then(
        function (r) { $scope.listsv = r.data; },
        function (d) { alert("Error"); }
    );

    $scope.check = function () {
        let username = $scope.u;
        let email = $scope.e;
        let fullname = $scope.f;
        let gender = $scope.g;
        let pass = $scope.p;
        let tc = false;
        $scope.tc = tc;
        let motsv = [];
        motsv.push = [username, pass,email,gender,fullname];
        $http.post("db/Students.js").then(
            function (r) {$scope.motsv = r.data},
            function(d){});
        if (tc) {
            sessionStorage.setItem('username', motsv.u);
            sessionStorage.setItem('hoten', motsv.fullname);
            sessionStorage.setItem('email', motsv.email);
            document.location = 'http://127.0.0.1:5501/index.html#!/home';
            window.location.reload('http://127.0.0.1:5501/index.html#!/home');
        }else{
            $scope.Thongbao="Sai mật khẩu hoặc email đăng nhập";
        }
    }
});

