angular.module('angular-tinify-s3').controller('uploadCtrl',['$scope', '$window', 'Upload', 
    function($scope, $window, Upload){

        // Set some model defaults for the Tinify API Parameters
        $scope.ulData={};
        $scope.ulData.ht=150;
        $scope.ulData.wd=150;
        $scope.ulData.m='fit';

        // Resize methods accepted (for the select box options)
        $scope.method = [
            { value: 'scale', name: 'Scale' },
            { value: 'fit', name: 'Fit' },
            { value: 'cover', name: 'Cover' }
        ];

        //Angular File Upload functions
        var vm = this;
        vm.submit = function(){
            if (vm.upload_form.file.$valid && vm.file) {
                vm.upload(vm.file, $scope.ulData);
            }
        };

        vm.upload = function (file, ulData) {
            Upload.upload({
                url: '/api/upload',
                data:{
                    file:file,
                    ulData:ulData
                }
            }).then(function() {
                alert('Upload Complete!');
            });
        };

}]);