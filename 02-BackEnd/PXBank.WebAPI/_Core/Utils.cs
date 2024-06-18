namespace PXBank.WebAPI._Core
{
    public class Utils
    {
        public static string UpperCaseFirst(string s)
        {
            if (string.IsNullOrEmpty(s))
            {
                return string.Empty;
            }

            char[] a = s.ToCharArray();
            a[0] = char.ToUpper(a[0]);

            return new string(a);
        }

    }
}
