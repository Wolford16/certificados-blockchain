// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title CertificateRegistry
 * @dev Contrato para registrar hashes de certificados digitales y verificar su autenticidad.
 */
contract CertificateRegistry {
    address public owner;
    
    // Mapping de hash del certificado => address (billetera del estudiante, o address(0) si no existe)
    mapping(string => address) public certificates;

    // Evento emitido cuando un certificado es registrado
    event CertificateIssued(string hash, address student, address issuer);

    modifier onlyOwner() {
        require(msg.sender == owner, "Solo el propietario puede ejecutar esta funcion");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    /**
     * @dev Registra un nuevo hash de certificado en la blockchain.
     * @param _hash El hash SHA-256 del certificado generado.
     * @param student La dirección (wallet) del estudiante al que pertenece el certificado.
     */
    function issueCertificate(string memory _hash, address student) public onlyOwner {
        require(certificates[_hash] == address(0), "El certificado ya ha sido registrado anteriormente");
        
        certificates[_hash] = student;
        
        emit CertificateIssued(_hash, student, msg.sender);
    }

    /**
     * @dev Verifica a quién le pertenece un hash de certificado en el registro.
     * @param _hash El hash SHA-256 a verificar.
     * @return address La dirección (wallet) del dueño del certificado, o address(0) si no existe.
     */
    function verifyCertificate(string memory _hash) public view returns (address) {
        return certificates[_hash];
    }
}
