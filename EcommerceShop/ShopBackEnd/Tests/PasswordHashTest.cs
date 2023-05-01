using Services;
namespace Tests;
public class PasswordHashTest
{
    [Fact]
    public void TestPasswordHashCorrect()
    {
        PasswordHasher ph = new PasswordHasher();
        string test = "PasswordTest";
        string testhash = ph.PasswordHash(test);
        bool matcher = ph.PasswordValidate(testhash, test);
        Assert.True(matcher);
    }

    [Fact]
    public void TestPasswordHashIncorrect()
    {
        PasswordHasher ph = new PasswordHasher();
        string test = "PasswordTest";
        string testhash = ph.PasswordHash("SomethingElse");
        bool matcher = ph.PasswordValidate(testhash, test);
        Assert.False(matcher);
    }
}