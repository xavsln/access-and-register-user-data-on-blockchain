//SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract ModifyArrayVariable {

    // Create a User struct
    struct UserData {
        uint256 userId;
        string userName;
        uint256 userAge;
        string userLocation;
    }

    // Create an array of users
    UserData[] users;

    // A variable that will be used to assign user IDs automatically
    // We may also use some external library to assign a unique ID for each user
    uint nextUserId = 1;

    // Functionalities
    // 1. Add a user to the array of users
    // 2. Get the array of users

    // New user can be registered using the below function
    function registerNewUser(string memory _name, uint256 _age,string memory _location) public {
        UserData memory newUser = UserData(nextUserId, _name, _age, _location);
        users.push(newUser);
        nextUserId +=1;
    }

    // A getter function that returns an Array of **all listed users**
    function getAllRegisteredUsersData() public view returns (UserData[] memory) {
        return users;
    }
}

// **********
// PRJ NOTES
// **********

// - Simple smart contract developed on Remix and deployed using Remix
// - Smart Contract verified on Etherscan for further interaction with frontend created separately (cf. frontend folder of the project)


// **********
// LOG
// **********

// - Contract deployed on Goerli at : 0xaF8943C1Dc55a5Dc675510Aa187435E55e74A355