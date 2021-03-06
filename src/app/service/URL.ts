export const Api = {
    BASE_URL: "http://localhost:2020/api",
    employeeLogin: "/employee/login",
    employeeChangePassword: "/employee/changePassword",
    getIndentByEmployeeId: "/employee/getIndentByEmployeeId",
    addIndent: "/employee/addIndent",
    updateIndent: "/employee/updateIndent",
    submitIndent: "/employee/submitIndent",
    deleteIndent: "/employee/deleteIndent",
    managementLogin: "/management/login",     
    uploadFile: "/management/uploadFile",
    downloadFile: "/management/downloadFile",
    //Read
    getAllFileNames: "/management/getAllFileNames",
    getAllIndentNo: "/management/getAllIndentNo",
    getAssetNo: "/asset/getNumber",
    getAssetId: "/asset",
    getPeripheralByAsset:"/assetPeripheral/getPeripheralByAsset",
    getAllCategory: "/category/getAll",
    getAllSubCategory: "/subcategory/getAll",
    getAllAssetGroup: "/assetGroup/getAll",
    getAllDepartment: "/department/getAll",
    getAllDesignation: "/designation/getAll",
    getAllLocation: "/location/getAll",
    getAllVendor: "/vendor/getAll",
    getAllDivision: "/division/getAll",
    getAllProject: "/project/getAll",
    getAllStatus: "/status/getAll",
    getAllPeripherals: "/peripherals/getAll",
    getAllEmployee: "/employee/getAll",
    getAllAsset: "/asset/getAll",    
    getAllAssetPeripheral: "/assetPeripheral/getAllAssetPeripheral",
    //Add
    addCategory: "/category/add",
    addSubCategory: "/subcategory/add",
    addAssetGroup: "/assetGroup/add",
    addDepartment: "/department/add",
    addDesignation: "/designation/add",
    addLocation: "/location/add",
    addVendor: "/vendor/add",
    addDivision: "/division/add",
    addProject: "/project/add",
    addStatus: "/status/add",
    addPeripherals: "/peripherals/add",
    addAsset: "/asset/add",
    addEmployee: "/employee/add",
    addGrcir : "/mrrpo/add",
    //Update
    updateCategory: "/category/update",
    updateSubCategory: "/subcategory/update",
    updateAssetGroup: "/assetGroup/update",
    updateDepartment: "/department/update",
    updateDesignation: "/designation/update",
    updateLocation: "/location/update",
    updateVendor: "/vendor/update",
    updateDivision: "/division/update",
    updateProject: "/project/update",
    updateStatus: "/status/update",
    updatePeripherals: "/peripherals/update",
    updateAsset: "/asset/update",
    updateEmployee: "/employee/update",
    //Delete
    deleteCategory: "/category/delete", 
    deleteSubCategory: "/subcategory/delete",
    deleteAssetGroup: "/assetGroup/delete",
    deleteDepartment: "/department/delete",
    deleteDesignation: "/designation/delete",
    deleteLocation: "/location/delete",
    deleteVendor: "/vendor/delete",
    deleteDivision: "/division/delete",
    deleteProject: "/project/delete",
    deleteStatus: "/status/delete",
    deletePeripherals: "/peripherals/delete",
    deleteEmployee: "/employee/delete",
    deleteAsset: "/asset/delete"
}