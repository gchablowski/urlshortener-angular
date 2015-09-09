'use strict';

describe('Controller: MainCtrl', function() {

// load the controller's module
    beforeEach(module('urlshortenerAngularApp'));
    beforeEach(module('UrlService'));
    var  MainCtrl, scope, $httpBackend, myConfig;

    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, $rootScope, _$httpBackend_, _myConfig_) {
        $httpBackend = _$httpBackend_;
        scope = $rootScope.$new();
        myConfig = _myConfig_;
        MainCtrl = $controller('MainCtrl', {
            $scope: scope
        });
    }));
    it('should attach a list of variable to the scope', function() {
        expect(scope.myForm).toEqual({});
        expect(scope.error).toEqual({});
        expect(scope.valid).toEqual({});
        expect(scope.url).toEqual({
            urlshortener_url: {
                url: ""
            }
        });
    });

    describe('submit', function() {

        it('add an url', function() {
            $httpBackend.expect('POST', myConfig.backend+'url/add').
                    respond(200, {"code":200,"message":"Your url is : http:\/\/lorem/lorem","errors":null});

            scope.submit();
            $httpBackend.flush();

            expect(scope.valid).toBe('Your url is : http:\/\/lorem/lorem');
        });

        it('error when add an url', function() {
            $httpBackend.expect('POST', myConfig.backend+'url/add').
                    respond(400, {"code": 400, "message": "Validation Failed", "errors": {"children": {"url": {"errors": ["This value is not valid."]}}}});

            scope.submit();
            $httpBackend.flush();

            expect(scope.error).toBe("This value is not valid.");
        });
    });

    describe('isEmptyObject', function() {

        it('verify if an object is empty', function() {
            var empty = scope.isEmptyObject({});
            expect(empty).toBe(true);

            empty = scope.isEmptyObject({0: "lorem"});
            expect(empty).toBe(false);
        });
    });
});
