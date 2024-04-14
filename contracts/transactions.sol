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
        uint indexed userId,
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

    struct WeaponStatus {
        uint weaponId;
        uint userId;
        string transactionType;
        uint timestamp;
        string status;
    }

    Weapon[] public weapons;
    WeaponStatus[] public statuses;

    function registerWeapon(
        uint _typeId,
        string memory _serialNumber,
        string memory _manufacturer,
        string memory _model,
        string memory _caliber,
        string memory _currentLocation,
        string memory _status
    ) public returns (uint) {
        uint newWeaponId = weapons.length + 1;
        weapons.push(
            Weapon(
                newWeaponId,
                _typeId,
                _serialNumber,
                _manufacturer,
                _model,
                _caliber,
                _currentLocation,
                _status
            )
        );
        statuses.push(
            WeaponStatus(
                newWeaponId,
                0, // Assuming system or admin user ID, adjust as necessary
                "Registration",
                block.timestamp,
                _status
            )
        );
        emit WeaponRegistered(newWeaponId, _typeId, _serialNumber);
        return newWeaponId;
    }

    function updateWeaponStatus(
        uint _weaponId,
        uint _userId,
        string memory _newStatus,
        string memory _transactionType
    ) public {
        require(
            _weaponId > 0 && _weaponId <= weapons.length,
            "Weapon does not exist."
        );
        Weapon storage weapon = weapons[_weaponId - 1];
        weapon.status = _newStatus;

        statuses.push(
            WeaponStatus(
                _weaponId,
                _userId,
                _transactionType,
                block.timestamp,
                _newStatus
            )
        );
        emit WeaponStatusUpdated(
            _weaponId,
            _userId,
            _transactionType,
            block.timestamp,
            _newStatus
        );
    }

    function decommissionWeapon(uint _weaponId) public {
        require(
            _weaponId > 0 && _weaponId <= weapons.length,
            "Weapon does not exist."
        );
        Weapon storage weapon = weapons[_weaponId - 1];
        weapon.status = "Decommissioned";

        statuses.push(
            WeaponStatus(
                _weaponId,
                0, // Assuming system or admin user ID, adjust as necessary
                "Decommission",
                block.timestamp,
                "Decommissioned"
            )
        );
        emit WeaponDecommissioned(_weaponId);
    }
}
