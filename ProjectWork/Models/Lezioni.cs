﻿using System;
using System.Collections.Generic;

namespace ProjectWork.Models
{
    public partial class Lezioni
    {
        public Lezioni()
        {
            Presenze = new HashSet<Presenze>();
        }

        public int IdLezione { get; set; }
        public DateTime Data { get; set; }
        public TimeSpan OraInizio { get; set; }
        public TimeSpan OraFine { get; set; }
        public string Titolo { get; set; }

        public ICollection<Presenze> Presenze { get; set; }
    }
}
