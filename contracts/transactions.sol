// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract WeaponRegistry {
    event WeaponRegistered(
        uint indexed weaponId,
        uint indexed typeId,
        string serialNumber
    );
    event WeaponStatusUpdated(
        uint indexed weaponId,
        address indexed userId,
        string transactionType,
        uint timestamp,
        string status
    );
    event WeaponDecommissioned(uint indexed weaponId);

    struct Weapon {
        uint weaponId;
        uint typeId;
        string serialNumber;
        string manufacturer;
        string model;
        string caliber;
        string currentLocation;
        string status;
    }

    Weapon[] public weapons;
    mapping(string => bool) public serialNumberExists;

    function registerWeapon(
        uint _typeId,
        string memory _serialNumber,
        string memory _manufacturer,
        string memory _model,
        string memory _caliber,
        string memory _currentLocation,
        string memory _status
    ) public returns (uint) {
        require(
            !serialNumberExists[_serialNumber],
            "Serial number already registered."
        );

        weapons.push(
            Weapon({
                weaponId: weapons.length + 1,
                typeId: _typeId,
                serialNumber: _serialNumber,
                manufacturer: _manufacturer,
                model: _model,
                caliber: _caliber,
                currentLocation: _currentLocation,
                status: _status
            })
        );
        serialNumberExists[_serialNumber] = true;
        emit WeaponRegistered(weapons.length, _typeId, _serialNumber);
        return weapons.length;
    }

    function decommissionWeapon(uint _weaponId) public {
        require(
            _weaponId > 0 && _weaponId <= weapons.length,
            "Weapon ID does not exist."
        );
        Weapon storage weapon = weapons[_weaponId - 1];

        require(
            keccak256(abi.encodePacked(weapon.status)) !=
                keccak256(abi.encodePacked("decommissioned")),
            "Weapon already decommissioned."
        );

        weapon.status = "decommissioned";
        emit WeaponDecommissioned(_weaponId);
    }

    function updateWeaponStatus(
        uint _weaponId,
        string memory _newStatus
    ) public {
        require(
            _weaponId > 0 && _weaponId <= weapons.length,
            "Weapon ID does not exist."
        );
        Weapon storage weapon = weapons[_weaponId - 1];
        weapon.status = _newStatus;
        emit WeaponStatusUpdated(
            _weaponId,
            msg.sender,
            "Status Update",
            block.timestamp,
            _newStatus
        );
    }
}
