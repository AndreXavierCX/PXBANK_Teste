﻿using System.Text.Json;

namespace PXBank.WebAPI.Error
{
    public class ErrorDetails
    {
        public int StatusCode { get; set; }
        public string Message { get; set; }
        public override string ToString()
        {
            return JsonSerializer.Serialize(this);
        }

    }
}
