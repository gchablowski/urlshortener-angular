'use strict';

describe('Controller: RedirectCtrl', function() {

// load the controller's module
    beforeEach(module('urlshortenerAngularApp'));
    beforeEach(module('UrlService'));
    var  RedirectCtrl, scope, $httpBackend, myConfig, routeParams;

    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, $rootScope, _$httpBackend_, _myConfig_, $routeParams) {
        $httpBackend = _$httpBackend_;
        scope = $rootScope.$new();
        myConfig = _myConfig_;
        routeParams = $routeParams;
        routeParams.short_code = 'aaa';
        RedirectCtrl = $controller('RedirectCtrl', {
            $scope: scope,
            routeParams: routeParams
        });
    }));
    it('should attach a error variable to the scope', function() {
        expect(scope.error).toEqual({});
    });

    describe('redirect to an url', function() {

        it('redirection', function() {
            $httpBackend.expect('GET', myConfig.backend+'aaa').
                    respond(200, {"url":"http:\/\/www.lorem.com","short_code":"aaa"});
        });

        it('error when redirect', function() {
            $httpBackend.expect('GET', myConfig.backend+'aaa').
                    respond(400, {"code":404,"message":"Unable to find your email.","errors":null});

            $httpBackend.flush();

            expect(scope.error).toBe("Unable to find your email.");
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
