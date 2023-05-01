 using System.Security.Cryptography;

 namespace Services;
 public class PasswordHasher{

    private const int SaltSize = 16; //128 / 8, length in bytes
    private const int KeySize = 32; //256 / 8, length in bytes
    private const int Iterations = 10000;
    private static readonly HashAlgorithmName _hashAlgorithmName = HashAlgorithmName.SHA256;
    private const char SaltDelimeter = ':';
    public string PasswordHash(string password)
    {
        byte[] salt = RandomNumberGenerator.GetBytes(SaltSize);
        byte[] hash = Rfc2898DeriveBytes.Pbkdf2(password, salt, Iterations, _hashAlgorithmName, KeySize);
        return string.Join(SaltDelimeter, Convert.ToBase64String(salt), Convert.ToBase64String(hash));
    }
    public bool PasswordValidate(string passwordHash, string password)
    {
        string[] pwdElements = passwordHash.Split(SaltDelimeter);
        byte[] salt = Convert.FromBase64String(pwdElements[0]);
        byte[] hash = Convert.FromBase64String(pwdElements[1]);
        byte[] hashInput = Rfc2898DeriveBytes.Pbkdf2(password, salt, Iterations, _hashAlgorithmName, KeySize);
        return CryptographicOperations.FixedTimeEquals(hash, hashInput);
    }
    public PasswordHasher(){
        // EMplty COnstructor
    }
 }
